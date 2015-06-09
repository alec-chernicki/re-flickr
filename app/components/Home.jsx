import { Reapp, React, View, Button, Input, Card } from 'reapp-kit';
import Superagent from 'superagent';

const key = '71bbe77a2fd4fd362fc1470b73ff5840';
const base = `https://api.flickr.com/services/rest/?api_key=${key}&format=rest&format=json&nojsoncallback=1`;

var Home = React.createClass({
  getInitialState() {
    return {
      photos: []
    }
  },

  getFlickrPhotoUrl(image) {
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
  },

  handleSearch() {
    let searchText = this.refs.search.getDOMNode().value;
    Superagent.get(`${base}&method=flickr.photos.search&text=${searchText}&per_page=1000&page=1`)
      .end((err, res) => {
      console.log(res);
      if (res.status === 200 && res.body.photos)
        this.setState({
          photos: res.body.photos.photo.map(this.getFlickrPhotoUrl)
        });
    });
  },

  styles: {
    view: {
      inner: {
        padding: '0 20px'
      }
    },

    input: {
      input: {
        border: '1px solid #ddd',
        margin: '10px 0'
      }
    },

    img: {
      width: '100%'
    }
  },

  render() {
    var { photos } = this.state;

    return (
      <View title="Flickr Search" styles={this.styles.view}>

        <Input ref="search" styles={this.styles.input} />
        <Button onTap={this.handleSearch}>Search Images</Button>

        <div className="verticalCenter">
          {!photos.length &&
            <p>No photos found!</p>
          }

          {!!photos.length &&
            photos.map((photo, i) =>
              <Card>
                <img styles={this.styles.img} src={photo}/>
              </Card>
            )
          }
        </div>
      </View>
    );
  }
});

export default Reapp(Home);
