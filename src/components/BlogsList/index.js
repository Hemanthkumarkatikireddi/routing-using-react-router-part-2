import {Component} from 'react'
import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import 'react-loader-spinner/dist/loader/css/..'

import './index.css'

class BlogsList extends Component {
  state = {blogsData: [], loading: true}

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const gettingData = await fetch('https://apis.ccbp.in/blogs')
    const data = await gettingData.json()

    const updateData = data.map(each => ({
      id: each.id,
      title: each.title,
      imageUrl: each.image_url,
      avatarUrl: each.avatar_url,
      author: each.author,
      topic: each.topic,
    }))
    this.setState({blogsData: updateData, loading: false})
  }

  render() {
    const {blogsData, loading} = this.state
    const loadingSpinner = loading ? (
      <Loader type="TailSpin" color="blue" height={50} width={50} />
    ) : (
      blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
    )

    return <div className="blog-list-container">{loadingSpinner}</div>
  }
}

export default BlogsList
