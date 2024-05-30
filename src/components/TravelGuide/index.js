import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import ListTravelGuide from '../ListTravelGuide'

const apiContantStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class TravelGuide extends Component {
  state = {apiStatus: apiContantStatus.initial, travelGuide: []}

  componentDidMount() {
    this.getTravelGuide()
  }

  getTravelGuide = async () => {
    this.setState({apiStatus: apiContantStatus.loading})

    const api = `https://apis.ccbp.in/tg/packages`
    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)
    const data = await response.json()

    const updatedData = data.packages.map(eachList => ({
      id: eachList.id,
      description: eachList.description,
      name: eachList.name,
      imageUrl: eachList.image_url,
    }))

    this.setState({
      travelGuide: updatedData,
      apiStatus: apiContantStatus.success,
    })
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {travelGuide} = this.state
    return (
      <div className="success-view-container">
        <ul className="unorder-list-guide">
          {travelGuide.map(eachList => (
            <ListTravelGuide key={eachList.id} eachGuide={eachList} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiContantStatus.loading:
        return this.renderLoadingView()
      case apiContantStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }
  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        {this.renderAllDetails()}
      </div>
    )
  }
}

export default TravelGuide
