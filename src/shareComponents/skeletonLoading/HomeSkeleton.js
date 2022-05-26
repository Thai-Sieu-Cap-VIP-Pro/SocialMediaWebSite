import React from "react";
import { Col, Row } from "react-bootstrap";
import "./skeleton.scss";

const HomeSkeleton = () => {
  return (
    <Col md={{ span: 12 }} className="hompageSkeleton">
      <Row>
        <Col md={{ span: 7 }}>
          <div className="postSkeleton">
            <div className="postSkeleton__header">
              <div className="postSkeleton__header__avatar"></div>
              <div className="postSkeleton__header__name"></div>
            </div>
            <div className="postSkeleton__img"></div>
            <div className="postSkeleton__footer">
              <div className="postSkeleton__footer__content"></div>
              <div className="postSkeleton__footer__content"></div>
              <div className="postSkeleton__footer__content"></div>
              <div className="postSkeleton__footer__content"></div>
            </div>
          </div>
        </Col>
        <Col md={{ span: 4, offset: 1 }}>
          <div className="categorySekeleton">
            <div className="categorySekeleton__header">
              <div className="categorySekeleton__header__avatar"></div>
              <div className="categorySekeleton__header__content">
                <div className="categorySekeleton__header__content__name"></div>
                <div className="categorySekeleton__header__content__name"></div>
              </div>
            </div>
            <div className="categorySekeleton__text">
              <div className="categorySekeleton__text__child"></div>
              <div className="categorySekeleton__text__child"></div>
            </div>
            <div className="categorySekeleton__recommend">
              <Row className="categorySekeleton__recommend__item">
                <Col md={{ span: 2 }}>
                  <div className="categorySekeleton__recommend__item__avatar"></div>
                </Col>
                <Col md={{ span: 7 }}>
                  <div className="categorySekeleton__recommend__item__name">
                    <div className="mot"></div>
                    <div className="mot"></div>
                  </div>
                </Col>
                <Col md={{ span: 3 }}>
                  <div className="categorySekeleton__recommend__item__follow"></div>
                </Col>
              </Row>
              <Row className="categorySekeleton__recommend__item">
                <Col md={{ span: 2 }}>
                  <div className="categorySekeleton__recommend__item__avatar"></div>
                </Col>
                <Col md={{ span: 7 }}>
                  <div className="categorySekeleton__recommend__item__name">
                    <div className="mot"></div>
                    <div className="mot"></div>
                  </div>
                </Col>
                <Col md={{ span: 3 }}>
                  <div className="categorySekeleton__recommend__item__follow"></div>
                </Col>
              </Row>
              <Row className="categorySekeleton__recommend__item">
                <Col md={{ span: 2 }}>
                  <div className="categorySekeleton__recommend__item__avatar"></div>
                </Col>
                <Col md={{ span: 7 }}>
                  <div className="categorySekeleton__recommend__item__name">
                    <div className="mot"></div>
                    <div className="mot"></div>
                  </div>
                </Col>
                <Col md={{ span: 3 }}>
                  <div className="categorySekeleton__recommend__item__follow"></div>
                </Col>
              </Row>
              <Row className="categorySekeleton__recommend__item">
                <Col md={{ span: 2 }}>
                  <div className="categorySekeleton__recommend__item__avatar"></div>
                </Col>
                <Col md={{ span: 7 }}>
                  <div className="categorySekeleton__recommend__item__name">
                    <div className="mot"></div>
                    <div className="mot"></div>
                  </div>
                </Col>
                <Col md={{ span: 3 }}>
                  <div className="categorySekeleton__recommend__item__follow"></div>
                </Col>
              </Row>
              <Row className="categorySekeleton__recommend__item">
                <Col md={{ span: 2 }}>
                  <div className="categorySekeleton__recommend__item__avatar"></div>
                </Col>
                <Col md={{ span: 7 }}>
                  <div className="categorySekeleton__recommend__item__name">
                    <div className="mot"></div>
                    <div className="mot"></div>
                  </div>
                </Col>
                <Col md={{ span: 3 }}>
                  <div className="categorySekeleton__recommend__item__follow"></div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default HomeSkeleton;
