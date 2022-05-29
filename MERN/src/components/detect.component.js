import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
      super(props);

      this.onChangeURL = this.onChangeURL.bind(this);

      this.state = {
        url: '',
        emotions: 0,
        link: '',
        response: ''
      }
  }

  submitForm(e, url) {
    var that = this;
    const axios = require('axios').default;
    let subscriptionKey = "ea65a2616e5f48cfb726dadf6650de69"
    let endpoint = 'https://demofaceapiinstance2901.cognitiveservices.azure.com//face/v1.0/detect'
    let imageUrl = url.toString()
    let resultJSON = {
      "age": 0,
      "emotions": ""
    }
    axios({
        method: 'post',
        url: endpoint,
        params : {
            returnFaceId: true,
            returnFaceLandmarks: false,
            returnFaceAttributes: 'age,emotion'
        },
        data: {
            url: imageUrl,
        },
        headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
        //console.log(response.data)
        response.data.forEach((face) => {
          let age = face.faceAttributes.age
          let emotion = face.faceAttributes.emotion
          resultJSON = {
            "age": age,
            "emotions": emotion
          }
          let score = JSON.stringify(resultJSON["emotions"]["happiness"])
          console.log('Age: ' + age)
          console.log('Happiness: ' + parseFloat(score))
          that.setState({emotions: parseFloat(score)})
          let rounded = JSON.stringify(Math.round((parseFloat(score) + Number.EPSILON) * 10) / 10)
          if (parseInt(age) >= 18)
          {
            axios.get('http://localhost:5000/playlists/'+rounded)
              .then(response => {
                let len = response.data.length
                if (len > 1)
                {
                  console.log(response.data[Math.floor(Math.random() * len)]["link"])
                  that.setState({link: response.data[Math.floor(Math.random() * len)]["link"]})
                }
                else {
                  console.log(response.data[0]["link"])
                  that.setState({link: response.data[0]["link"]})
                }
            });
          }
          else {
            axios.get('http://localhost:5000/playlists/clean/'+rounded)
              .then(response => {
                let len = response.data.length
                if (len > 1)
                {
                  console.log(response.data[Math.floor(Math.random() * len)]["link"])
                  that.setState({link: response.data[Math.floor(Math.random() * len)]["link"]})
                }
                else {
                  console.log(response.data[0]["link"])
                  that.setState({link: response.data[0]["link"]})
                }
            });
          }
          if (parseFloat(rounded) > 0.6) {
            that.setState({response: "you are happy :)"})
          }
          else if (parseFloat(rounded) >= 0.4 || parseFloat(rounded) <= 0.6) {
            that.setState({response: "you are meh :|"})
          }
          else {
            that.setState({response: "you are sad :("})
          }
        });
    }).catch(function (error) {
        that.setState({response: "no playlists found :("})
        console.log(error)
    });
    e.preventDefault();
  }

  onChangeURL(e) {
    this.setState({
      url: e.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="App">Analyze Image</h1> <br />
        <p>Paste your image URL below to get your custom Spotify playlist!</p>
        <form onSubmit={(e) => this.submitForm(e, document.getElementById("link").value)}>
          <div className="form-group">
          <label className="App">Image URL: </label>
            <input type="text"
                id="link"
                required
                className="form-control"
                value={this.state.url}
                onChange={this.onChangeURL}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="analyze" className="btn btn-primary" />
          </div> <br />
          <div className="App">
            <img src={this.state.url} alt="" style={{height: 500}}></img>
          </div> <br />
          <div className="App">
            <h3> {this.state.response} </h3>
            Happiness Index: {this.state.emotions} <br />
            Click <a href={this.state.link}> here </a> for your playlist!
          </div>
        </form>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    )
  }
}
