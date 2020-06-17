import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useAuth0 } from "../react-auth0-spa";

function BillSetter(props) {
  const { isAuthenticated } = useAuth0();
  const [isValid, setValidation] = useState(true);

  const divideBill = () => {
    props.setPendingVal(props.bill);
    console.log(props.cards);
    if (props.bill > 0) {
      const validate = [...props.cards].filter((card) => card.name === "");
      if (validate.length > 0) {
        setValidation(false);
      } else {
        setValidation(true);
        if (!props.equalAmount) {
          props.setCards([...props.cards]);
          let pending = [...props.cards].filter((card) => card.amount > 0);
          if (pending.length > 0) {
            pending = pending.reduce((a, b) => ({
              amount: a.amount + b.amount,
            }));
            const currPending = props.bill + props.bill * 0.15 - pending.amount;
            props.setPendingVal(currPending);
            console.log(props.pendingVal);

            return props.setSplit(true);
          }
        }
        const toPayEach = (props.bill + props.bill * 0.15) / props.cards.length;
        props.setBillEach(toPayEach);

        return props.setSplit(true);
      }
    }
    console.log("bill empty");
    return setValidation(false);
  };

  return (
    <div className="bill-setter-div">
      <Form onSubmit={(e) => e.preventDefault()} className="bill-setter-form">
        <Form.Group controlId="formBasicCost">
          <Form.Label className="splitter-label-header">Bill amount</Form.Label>
          <div>
            {!props.r_isValid && (
              <Form.Label className="splitter-label-header-warning">
                Remaining must be at 0 before saving
              </Form.Label>
            )}

            {!isValid && (
              <Form.Label className="splitter-label-header-warning">
                Please enter the bill and each card field
              </Form.Label>
            )}
          </div>
          <Form.Control
            type="text"
            placeholder="Enter bill"
            name="bill"
            onChange={(e) => {
              props.setPendingVal(
                parseInt(e.target.value) + parseInt(e.target.value) * 0.15
              );
              return props.setBill(parseInt(e.target.value));
            }}
          />
        </Form.Group>

        <fieldset className="amount-settings">
          <Row>
            <Col>
              <Form.Group>
                <Form.Check
                  className="amount-settings-checks"
                  style={{ marginBottom: "1em" }}
                  type="radio"
                  label="Equal Parts"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                  defaultChecked="true"
                  onClick={() => props.setTypeAmount(true)}
                />
                <Form.Check
                  className="amount-settings-checks"
                  type="radio"
                  label="Different Amounts"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                  onClick={() => props.setTypeAmount(false)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                style={{
                  textAlign: "right",
                  marginRight: "1em",
                  marginTop: "0.4em",
                }}
              >
                {!isAuthenticated && (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        You need to login to enable features
                      </Tooltip>
                    }
                  >
                    <span className="d-inline-block">
                      <Button
                        style={{ pointerEvents: "none" }}
                        className="split-btn"
                        onClick={divideBill}
                        disabled={!isAuthenticated}
                      >
                        Split
                      </Button>
                    </span>
                  </OverlayTrigger>
                )}
                {isAuthenticated && (
                  <Button className="split-btn" onClick={divideBill}>
                    Split
                  </Button>
                )}
              </Form.Group>
              <Form.Group
                style={{
                  textAlign: "right",
                  marginRight: "1em",
                  marginTop: "0.4em",
                }}
              >
                {!isAuthenticated && (
                  <span className="d-inline-block">
                    <Button
                      style={{ pointerEvents: "none" }}
                      className="split-btn"
                      onClick={props.submitSplit}
                      disabled={!isAuthenticated}
                    >
                      Split
                    </Button>
                  </span>
                )}
                {isAuthenticated && (
                  <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        Before saving make sure to split the bill first
                      </Tooltip>
                    }
                  >
                    <Button className="split-btn" onClick={props.submitSplit}>
                      Save
                    </Button>
                  </OverlayTrigger>
                )}
              </Form.Group>
            </Col>
          </Row>
        </fieldset>

        <div style={{ color: "rgba(0, 0, 0, 0.7)" }}>
          {`Subtotal: $${props.bill}`}
        </div>
        <Form.Group style={{ color: "#242582", fontWeight: "500" }}>
          <Form.Label>{`Total: $${props.bill + props.bill * 0.15}`}</Form.Label>
          <Form.Text
            className="text-muted"
            style={{ marginTop: "-5px", fontWeigth: "300" }}
          >
            ISV is already included on total.
          </Form.Text>
        </Form.Group>
        <div>
          {!props.equalAmount &&
            props.pendingVal !== undefined &&
            `Remaining: $${props.pendingVal}`}
        </div>
        {props.split && props.equalAmount && (
          <div>
            {props.cards.map((card) => (
              <li key={card.id_key}>{`${card.name}, to pay:${(
                (props.bill + props.bill * 0.15) /
                props.cards.length
              ).toFixed(1)}`}</li>
            ))}
          </div>
        )}
        {props.split && !props.equalAmount && (
          <div>
            {props.cards
              .filter((card) => card.amount > 0)
              .map((card) => (
                <li key={card.id_key}>
                  {`${card.name}, ${card.item} : ${card.amount}`}$
                </li>
              ))}
          </div>
        )}
      </Form>
    </div>
  );
}

export default BillSetter;
