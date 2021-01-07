
import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {




  render() {
    // return this.props.pets.map(pet => < Pet pet={pet} />)
    console.log(this.props)
    


    return <div className="ui cards">
      {this.props.pets.map (petInfo => {
          return (

            <Pet pet={petInfo} onAdoptPet={this.props.onAdoptPet}/>
          )
        })
      }
    </div>
  }
}

export default PetBrowser