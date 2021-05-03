import React from 'react'

import { WButton, WRow, WCol } from 'wt-frontend'

const TableHeader = (props) => {
  // const clickDisabled = () => { };
  const buttonStyle = props.disabled
    ? ' table-header-button-disabled '
    : 'table-header-button '

  // const undoOptions = {
  //     className: props.disabled || !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
  //     onClick: props.disabled || !props.canUndo  ? clickDisabled : props.undo,
  //     wType: "texted",
  //     clickAnimation: props.disabled || !props.canUndo ? "" : "ripple-light",
  //     shape: "rounded"
  // }

  // const redoOptions = {
  //     className: props.disabled || !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
  //     onClick: props.disabled || !props.canRedo   ? clickDisabled : props.redo,
  //     wType: "texted",
  //     clickAnimation: props.disabled || !props.canRedo ? "" : "ripple-light" ,
  //     shape: "rounded"
  // }

  return (
    <div>
      <div
        style={{
          paddingTop: '1%',
          paddingBottom: '1%',
          display: 'flex',
          flexDirection: 'horizontal',
        }}
      >
        <WButton
          wType='texted'
          className={`${buttonStyle}`}
          clickAnimation={props.disabled ? '' : 'ripple-light'}
          style={{ color: 'green' }}
        >
          <i className='material-icons'>add_box</i>
        </WButton>
        <WButton>
          <i className='material-icons'>undo</i>
        </WButton>
        <WButton>
          <i className='material-icons'>redo</i>
        </WButton>
        <h1>Region Name:</h1>
      </div>

      <WRow className='table-header' style={{ backgroundColor: 'red' }}>
        <WCol size='3'>
          <WButton
            className='table-header-section'
            wType='texted'
            style={{ paddingLeft: '2.5%' }}
          >
            Name
          </WButton>
        </WCol>

        <WCol size='2'>
          <WButton
            className='table-header-section'
            wType='texted'
            style={{ paddingLeft: '2.5%' }}
          >
            Capital
          </WButton>
        </WCol>

        <WCol size='2'>
          <WButton
            className='table-header-section'
            wType='texted'
            style={{ paddingLeft: '2.5%' }}
          >
            Leader
          </WButton>
        </WCol>
        <WCol size='2'>
          <WButton
            className='table-header-section'
            wType='texted'
            style={{ paddingLeft: '2.5%' }}
          >
            Flag
          </WButton>
        </WCol>
        <WCol size='3'>
          <WButton
            className='table-header-section'
            wType='texted'
            style={{ paddingLeft: '2.5%' }}
          >
            Landmarks
          </WButton>
        </WCol>
      </WRow>
    </div>
  )
}

export default TableHeader
