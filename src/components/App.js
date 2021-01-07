import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateFilterType = (event) => {
    // console.log(event)
    this.setState({
      filters: {
        type: event.currentTarget.value
      }
    })
  }


  fetchPets = () => {


    if (this.state.filters.type !== "all") {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json

        })
      })
    } else {

      fetch('/api/pets')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json
          
        })
      })
    }

  }

  onAdoption = (petId) => {
    debugger
    const pets = this.state.pets.map(pet => {
      if (pet.id === petId) {
        return {...pet, isAdopted: true}
      } else {
        return pet
      }

      
    })
    this.setState({pets: pets})
    // let adoptedPet = this.state.pets.find(pet => pet.id === petId)
    // debugger
    // console.log(this.state.pets)
    // console.log(this.state.pets.splice(0, 1))
    // console.log(this.state.pets)



    // this.setState({
    //   pets: [[...this.state.pets], adoptedPet]
    // })
    // // this.setState({
    // //   pets: [...this.state.pets, adoptedPet]

    // // })
    // console.log(adoptedPet)
    // // debugger

    



  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              < Filters onChangeType={event => this.updateFilterType(event)} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoption} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App


