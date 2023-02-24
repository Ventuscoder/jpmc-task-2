import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';
import { clearInterval } from 'timers';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  // This property showGraph is important as it turns on only when the user presses on the show graph button
  showGraph: boolean
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      // Here we are setting showGraph by default as false so that the data starts streaming and the graph gets displayed only when the user presses the button
      showGraph: false
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    // This implements the conditional functionality of the show graph button
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // This variable makes sure that the interval does not run forever
    let x = 0;
    const interval = setInterval(()=>{
      // Getting the data from the DataStreamer
      DataStreamer.getData((serverResponds: ServerRespond[])=> {
        // Change the state
        this.setState({
          data: serverResponds,
          showGraph: true
        });
      });
      // Make sure the interval does not run forever
      x++;
      if (x > 1000) {
        clearInterval(interval)
      }
    }, 100)
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
