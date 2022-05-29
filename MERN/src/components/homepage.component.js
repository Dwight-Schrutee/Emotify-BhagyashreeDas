import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "./assets/home-main.png";
import home1 from "./assets/hm1.png"

function Home() {
  return (
      <Container fluid  id="home">
        <Container className="App home">
          <Row>
            <Col md={7} className="home-header">
              <h1  className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>
              <h1 className= "sub-heading">
                Welcome to Emotify!
              </h1>
              <h2 className= "motto">
              A one-stop place for playing music according to your mood.</h2>
              <br></br>
              <h4>A big smile on your face? Then, listen to the Happy Mix. Or if you are feeling down, maybe some Hozier to listen to and stare out of your window? </h4>
            </Col>
            <Col md={5} style={{ paddingBottom: 100 }}>
              <img
                src={homeLogo}
                alt="home pic"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
          <div className="elements">
          <p>Emotify is a emotion music recommendation web application that recommends playlists based on the happiness index that is detected from one's image.
          Just upload a picture of yourself and let Emotify work the magic! Using facial recognition
          software, Emotify is able to detect your happiness index and recommend the absolue perfect Spotify playlist according to the happiness index.</p>
          </div>
          <img src={home1}
           style={{ paddingRight: "650px" , marginTop: "-400px"}}
          />
        <div style={{ paddingTop: 100 }}>
          <h2>How does it work?</h2>
          <p style={{ fontSize: "20px", paddingTop: 15, paddingRight: 75, paddingLeft: 75 }}>Emotify is built using the MERN stack(MongoDB, Express, React, Node.js) along with Microsoft Face API and Spotify API. Microsoft Face API is used to obtain the emotional indices for each face 
          in an uploaded image when connections to the database and localhost have been established. The Face API calculates a happiness score by detecting the relative positions of facial features such as lips and eyes. 
          The happiness score is rounded to the closest tenth because the Face API returns floating point values. 
          The happiness score is then recorded and compared to documents holding a Spotify playlist link and its accompanying happiness index in the MongoDB database. 
          The program outputs and shows the playlist with the closest score match after comparing the face's emotional score to the database entries.</p> 
          <p style={{ fontSize: "20px", paddingTop: 10, paddingRight: 75, paddingLeft: 75  }}>Additionally, a script based on Spotify's open-source API allows for the dynamic insertion and modification of new playlists and their 
          associated scores. A happiness index (float from 0-1) related to the playlist will be calculated based on the tempo, energy, and danceability of the songs. This index is compared to the Microsoft Face API result once again. Playlists will be recommended with exponentially increasing accuracy 
          when working in tandem with the API-to-database connection. The clean.py file accepts a MongoDB object ID and derives the track features for the playlist it corresponds to. These characteristics
           are then utilized to construct a new happiness index (which corrects the user-inputted index) and update the database appropriately.</p>
        </div>
        </Container> 
        <footer className="footer">
            <div>
              <small>Copyright &copy; Emotify</small>
              <br></br>
              <small>Bhagyashree Das</small>
            </div>
        </footer>
      </Container>

  );
}

export default Home;