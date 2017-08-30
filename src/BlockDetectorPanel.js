import React, {Component} from 'react';
import {Container, Row, Col, Form, Input, InputGroup, InputGroupButton, ListGroup, ListGroupItem, Popover, PopoverTitle, PopoverContent, Button, Badge} from 'reactstrap';

class BlockDetectorPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {active: false, popoverOpen: false};
  }

  checkEvent = (event) => {
    this.setState({active: event.target.checked});
  }

  togglePopover = (event) => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    var statusClass = this.state.active ? '' : 'passive';

    return (
      <div id="blockDetectorPanel" className="panel">
        <div className="input-group form-control">
            <label>
                <input disabled type="checkbox" name="autoRedirect" id="blockedWebsiteRadar" checked={this.state.active} onChange={this.checkEvent} />
                <b>Engellenmiş Site Algılayıcı</b>
                <p>Uzantı engelli site algıladığında otomatik olarak devreye girerek gir.im üzerinden açar</p>
            </label>
        </div>
        <Badge className="float-right soonBadge">yakında</Badge>
        <a tabIndex="0" id="Popover1" onClick={this.togglePopover} className="btn btn-warning btn-sm float-left descriptionButton" role="button" data-toggle="popover" data-trigger="focus" title="Nasıl çalışır?" data-content="">?</a>
        <Popover placement="right" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglePopover}>
          <PopoverTitle>Nasıl çalışır?</PopoverTitle>
          <PopoverContent>Girilen sayfanın, HTTP durum kodlarını, engelli sayfalara benzerliğini inceleyerek karar verir. Özellikle bir çok sitenin engellendiği, ağ filtreleri kullanılan iş yerlerinde çalışanlar için yararlı olabilir.</PopoverContent>
        </Popover>
        <div className={"col-md-12 blocked-website-radar-panel "+statusClass}>
            <div className="row mb-3">
                <div className="input-group form-control">
                    <label>
                        <input type="checkbox" name="autoRedirect" id="autoRedirect" />
                        <b>İkon Animasyonu</b>
                        <p>Engelli sitelere girildiğinde uzantı ikonu hareketlenir</p>
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="input-group form-control">
                    <label>
                        <input type="checkbox" name="autoRedirect" id="autoRedirect" />
                        <b>Otomatik Proksi</b>
                        <p>Engelli sitelere girildiğinde otomatik olarak gir.im üzerinden açılır</p>
                    </label>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default BlockDetectorPanel;
