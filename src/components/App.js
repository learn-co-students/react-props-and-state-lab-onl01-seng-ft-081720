import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
import Pet from './Pet'

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

  onChangeType = (type) => {
    console.log(type.value)
    this.state.filters.type = type.value
    console.log(this.state.filters.type)
  }

  onFindPetsClick = () => {
    let thingy = this.state.filters.type
    if (thingy === 'cat' || thingy === 'dog' || thingy === 'micropig'){
      fetch(`/api/pets?type=${this.state.filters.type}`).then(resp => resp.json()).then(petData => this.setDatState(petData))
    } else {
      fetch("/api/pets").then(resp => resp.json()).then(petData => this.setDatState(petData))
    }
  }

  setDatState = (data) => {
    this.setState(previousState => {
      return {
        pets: data
      }
    })
  }

  onAdoptPet = (id) => {
    this.state.pets.find(pet => pet.id === id).isAdopted = true
    console.log(this.state.pets.find(pet => pet.id === id))
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
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
             />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
