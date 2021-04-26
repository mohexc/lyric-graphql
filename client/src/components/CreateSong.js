import { Modal, Form, Input, Row, Button, notification } from 'antd'
import React, { useState, useImperativeHandle } from 'react'
import { useMutation, gql } from '@apollo/client';
import { SmileOutlined } from '@ant-design/icons';


const CREATE_SONG = gql`
 mutation CreatSong($title: String!) {
  addSong(title: $title){
    id
    title
  }
}`

const CreateSong = ({ refetch }, ref) => {
  const [visible, setVisible] = useState(false)
  const [addSong, { data, error, loading }] = useMutation(CREATE_SONG)


  useImperativeHandle(ref, () => {
    return {
      showModal: (record) => {
        setVisible(true)
      }
    }
  })


  const onFinish = async (formData) => {

    await addSong({ variables: formData, })
    refetch()
    setVisible(false)
  }
  const onFinishFailed = (error) => {


  }
  return (
    <Modal title="Create Item" visible={visible} footer={null} onCancel={() => setVisible(false)}>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="title" rules={[]}>
          <Input placeholder="title song" />
        </Form.Item>
        <Row justify='end'>
          <Button style={{ marginRight: "1rem" }} htmlType="button" onClick={() => setVisible(false)}>Cancle</Button>
          <Button type="primary" htmlType='submit'>OK</Button>
        </Row>
      </Form>
    </Modal>
  )
}

export default React.forwardRef(CreateSong)
