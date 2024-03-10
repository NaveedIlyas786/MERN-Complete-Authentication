import React from 'react'

const Error = () => {
  const styles = {

    notfound:{
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(255,215,255)"
},
image:{
  width: "100%",
  height: "100%",
    }
  }
  return (
    <div style={styles.notfound}>
      <img style={styles.image} src="../../src/assets/notfound.jpg" alt="" />
    </div>
  )
}

export default Error