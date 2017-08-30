/*global chrome*/
import React, {Component} from 'react';
import {Container, Row, Col, Form, Input, InputGroup, InputGroupButton, ListGroup, ListGroupItem, Alert} from 'reactstrap';

class AutoRedirectPanel extends Component {
  constructor(props) {
    super(props);

    // default options
    var defaultOptions = {
      autoRedirectionWebsites: ["wikipedia.org", "wikimedia.org"],
      autoRedirection: true
    };
      
    // default state  
    this.state = {
      active: defaultOptions.autoRedirection,
      autoRedirectionWebsites: defaultOptions.autoRedirectionWebsites, 
      enteredWebsite: null,
      alertMessage: null
    };

    var _this = this;

    // get options from storage
    // because we work with react, we should check if chrome.storage is undefined to work without getting error
    if(typeof chrome.storage != "undefined")
    {
      chrome.storage.sync.get({
        autoRedirectionWebsites: defaultOptions.autoRedirectionWebsites,
        autoRedirection: defaultOptions.autoRedirection
      }, function(items) {
        _this.setState({
          autoRedirectionWebsites: items.autoRedirectionWebsites,
          active: items.autoRedirection
        });
      });
    }

  }

  // updates every state change to options of extension
  componentWillUpdate(nextProps, nextState)
  {
    if(typeof chrome.storage != "undefined")
    {
      chrome.storage.sync.set({
        autoRedirectionWebsites: nextState.autoRedirectionWebsites,
        autoRedirection: nextState.active
      });
    }
  }

  // toggles panel (checkbox onchange listener)
  togglePanel = (event) => {
    this.setState({active: event.target.checked});
  }

  // adds websites to state (form on submit listener)
  addRedirectionWebsite = (event) => {
    event.preventDefault();

    if(this.state.autoRedirectionWebsites.indexOf(this.state.enteredWebsite) == -1)
    {
      this.setState({
        autoRedirectionWebsites: this.state.autoRedirectionWebsites.concat([this.state.enteredWebsite]), 
        alertMessage: null,
        enteredWebsite: null
      }); 
    }
    else
    {
      this.setState({alertMessage: "Girdiğiniz site zaten listede bulunmakta"});
    }
    
  }

  // removes websites from state (remove anchor listener)
  removeRedirectionWebsite = (website, event) => {
    var currentRedirectionWebsites = this.state.autoRedirectionWebsites.slice();
    var index = currentRedirectionWebsites.indexOf(website);
    
    if (index !== -1) {
        currentRedirectionWebsites.splice(index, 1);
    }

    this.setState({autoRedirectionWebsites: currentRedirectionWebsites});
  }

  // syncs entered website with state enteredWebsite value 
  handleWebsiteChange = (event) => {
    this.setState({enteredWebsite: event.target.value});
  }

  // annnddd our greaaat render function
  render() {
    var statusClass = this.state.active ? '' : 'passive';
    var _this = this;
    
    return (
      <div id="autoRedirectPanel" className="panel">
        <Alert color="danger" className={this.state.alertMessage == null ? "passive" : ""}>
          {this.state.alertMessage}
        </Alert>
        <div className="input-group form-control">
          <label>
            <input type="checkbox" name="autoRedirect" id="autoRedirect" checked={this.state.active} onChange={this.togglePanel}/>
            <b>Otomatik Yönlendirme</b>
            <p>Belirtilen sitelere girildiğinde, otomatik olarak gir.im kullanılır</p>
          </label>
        </div>
        <div className={"col-md-12 auto-redirect-panel "+statusClass}>
          <Row className="mb-3">
            <Form onSubmit={this.addRedirectionWebsite}>
              <InputGroup>
                <Input required placeholder="girilemeyensite.com" value={this.state.enteredWebsite || ''} onChange={this.handleWebsiteChange} />
                <InputGroupButton type="submit" color="success">Ekle</InputGroupButton>
              </InputGroup>
            </Form>
          </Row>
          <Row>
            <ListGroup>
              {this.state.autoRedirectionWebsites.map((x, i) =>
                <ListGroupItem key={x}>{x}
                  <a href="#" data-key={x} onClick={this.removeRedirectionWebsite.bind(null, x)} className="badge badge-danger float-right">kaldır</a>
                </ListGroupItem>
              )}
            </ListGroup>
          </Row>
        </div>
      </div>
    );
  }
}

export default AutoRedirectPanel;
