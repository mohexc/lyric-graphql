import React from 'react'
import { Card } from 'antd'
import { useQuery, gql } from '@apollo/client';

const SONGS = gql`
  query {
    songs{
      id
      title
    }
  }`

const SongList = () => {
  const { loading, error, data } = useQuery(SONGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data.songs.map(song => (

        <Card style={{ width: 300, margin: '1rem', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }} key={song.id}>
          <p>id: {song.id}</p>
          <p>title: {song.title}</p>
        </Card>
      ))}
    </div>
  )
}


export default SongList
