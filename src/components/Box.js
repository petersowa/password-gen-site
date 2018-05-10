import React, { Component } from 'react'

export class Box extends Component {
  static styles = {
    noPadding: {
      style: {
        padding: 0
      }
    },
    smMargin: {
      style: {
        margin: 5
      }
    }
  }

  static height = h => ({
    style: {
      height: h
    }
  })

  static float = (w, h, float = "left", margin = 0) => (
    { style: { width: w, height: h, float, margin } }
  )

  static style = (sty = {}) => (
    { style: sty }
  )

  static ClearDiv = () => (
    <Box className="clear" />
  )

  static NavDiv = ({ bg, children, loc, ...rest }) => {
    return (
      <Box
        {...rest}
        bg={bg}
        className="box-nav-container"
        style={
          {
            position: "fixed",
            ...((loc === 'bottom') ? { bottom: 0 } : { top: 0 }),
            left: 0,
            margin: 0,
            width: "100%",
            height: "50px",
            zIndex: 10
          }
        }>
        {
          children
        }
      </Box>
    )
  }

  static ContentDiv = props => (
    <Box
      bg="transparent"
      className="content"
      style={
        {
          marginTop: 50,
          marginBottom: 50,
        }
      }>
      {
        props.children
      }
    </Box>
  )

  randomColor() {
    return (
      '#' + Math.floor(Math.random() * (2 ** 24))
        .toString(16)
        .padStart(6, '0')
    )
  }

  render() {
    const { data, bg, fg, className, children, style, ...rest } = this.props;
    const boxStyle = {
      ...style
    }
    if (bg) boxStyle.backgroundColor = bg
    if (fg) boxStyle.color = fg
    return (
      <div {...rest}>
        {(!!data) ?
          (data.length>0) && data.map(e => <div key={e}
            className={className || "box"}
            style={boxStyle}>
            {e}
          </div>)
          :
          <div
            className={className || "box"}
            style={boxStyle}>
            {children}
          </div>}
      </div>
    )
  }
}

export const BoxNav = props => (
  <div>
    <Box {...props} className="box-nav"></Box>
  </div>
)