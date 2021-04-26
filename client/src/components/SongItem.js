import { Button, Modal, Row } from 'antd'
import React, { useImperativeHandle, useState } from 'react'

const SongItem = (props, ref) => {
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState()

  useImperativeHandle(ref, () => {
    return {
      showModal: (record) => {
        setVisible(true)
        setRecord(record)
      }
    }
  })

  const handleOk = () => {
    setVisible(false)
  }
  return (
    <Modal title="Song Item" visible={visible} footer={null} onCancel={() => setVisible(false)}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <Row justify='end'>
        <Button style={{ marginRight: "1rem" }} htmlType="button" onClick={() => setVisible(false)}>Cancle</Button>
        <Button type="primary" htmlType="button" onClick={() => setVisible(false)}>OK</Button>
      </Row>
    </Modal>
  )
}

export default React.forwardRef(SongItem)
