import React, { useRef } from 'react'
import { Card, Row, Col, Button } from 'antd'
import { useQuery, gql } from '@apollo/client';
import CreateSong from './CreateSong';
import SongItem from './SongItem';

const SONGS = gql`
  query {
    songs{
      id
      title
      lyrics{
        id
        content
      }
    }
  }`

const SongList = () => {
  const { loading, error, data, refetch } = useQuery(SONGS);
  const createSongRef = useRef()
  const songItemRef = useRef()

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <Row style={{ margin: "1rem" }}>

        <Col xs={{ span: 10, offset: 2 }}><h3>Song List</h3></Col>
        <Col xs={10} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" onClick={() => createSongRef.current.showModal()}>CREATE SONG</Button>
        </Col>

      </Row>

      <Row justify="center">
        <Col xs={20}>
          {data.songs.map(song => (
            <Card
              onClick={() => songItemRef.current.showModal()}
              style={{ cursor: "pointer", margin: '1rem', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}
              key={song.id}
            >
              <p>id: {song.id}</p>
              <p>title: {song.title}</p>
              <Row>
                <Col xs={6}>Lyrics : </Col>
                <Col xs={18}>{song.lyrics.map(lyric => <p key={lyric.id}>{lyric.content}</p>)}</Col>
              </Row>
            </Card>
          ))}
        </Col>
      </Row>
      <CreateSong ref={createSongRef} refetch={refetch} />
      <SongItem ref={songItemRef} />
    </div>
  )
}


export default SongList
