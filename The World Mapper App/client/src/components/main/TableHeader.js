import React from 'react'

import { WButton, WRow, WCol } from 'wt-frontend'
import { ADD_SUBREGION } from '../../cache/mutations'
import { useMutation, useQuery } from '@apollo/client'
import { GET_DB_REGIONS } from '../../cache/queries'
import * as mutations from '../../cache/mutations'
import { UpdateRegions_Transaction } from '../../utils/jsTPS'

const TableHeader = (props) => {
  const clickDisabled = () => {}
  const buttonStyle = props.disabled
    ? ' table-header-button-disabled '
    : 'table-header-button '

  const undoOptions = {
    className:
      !props.tps.getUndoSize() > 0
        ? ' table-header-button-disabled '
        : 'table-header-button',
    onClick: !props.tps.getUndoSize() > 0 ? clickDisabled : props.undo,
    wType: 'texted',
    clickAnimation: !props.tps.getUndoSize() > 0 ? '' : 'ripple-light',
    shape: 'rounded',
  }

  const redoOptions = {
    className:
      !props.tps.getRedoSize() > 0
        ? ' table-header-button-disabled '
        : 'table-header-button ',
    onClick: !props.tps.getRedoSize() > 0 ? clickDisabled : props.redo,
    wType: 'texted',
    clickAnimation: !props.tps.getRedoSize() > 0 ? '' : 'ripple-light',
    shape: 'rounded',
  }
  const [SortSubregions] = useMutation(mutations.SORT_SUBREGIONS)

  const handleSortSubregions = async (e, criteria) => {
    const { data } = await SortSubregions({
      variables: { _id: props.parentRegionId, criteria: criteria },
      refetchQueries: [{ query: GET_DB_REGIONS }],
    })
  }

  console.log(props.tps.getUndoSize(), props.tps.getRedoSize())

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
        <div style={{ alignItems: 'center', fontSize: '56px' }}>
          <WButton
            wType='texted'
            className={`${buttonStyle}`}
            clickAnimation={props.disabled ? '' : 'ripple-light'}
            style={{ color: 'green', padding: '0px' }}
            onClick={() => {
              props.addSubregion(props.parentRegionId)
              props.refetchRegions()
              props.fetchUser()
            }}
          >
            <i className='material-icons' fontSize='64px'>
              add_box
            </i>
          </WButton>
          <WButton {...undoOptions} style={{ padding: '0px' }}>
            <i className='material-icons'>undo</i>
          </WButton>
          <WButton {...redoOptions} style={{ padding: '0px' }}>
            <i className='material-icons'>redo</i>
          </WButton>
        </div>
        <h1 style={{ textAlign: 'center', color: 'white', paddingLeft: '33%' }}>
          Region Name:
        </h1>
        <h1
          style={{
            color: 'lightblue',
            paddingLeft: '1%',
            textAlign: 'center',
          }}
        >
          {props.regionName}
        </h1>
      </div>

      <WRow
        className='table-header'
        style={{
          backgroundColor: 'red',
          // height: '10%',
        }}
        onClick={(e) => {
          handleSortSubregions(e, 'name')
        }}
      >
        <WCol size='3'>
          <WButton
            className='table-header-section'
            wType='texted'
            style={{ paddingLeft: '8%' }}
          >
            Name
          </WButton>
        </WCol>

        <WCol size='2'>
          <WButton
            className='table-header-section'
            wType='texted'
            // style={{ paddingLeft: '2.5%' }}
            onClick={(e) => {
              handleSortSubregions(e, 'capital')
            }}
          >
            Capital
          </WButton>
        </WCol>

        <WCol size='2'>
          <WButton
            className='table-header-section'
            wType='texted'
            // style={{ paddingLeft: '2.5%' }}
            onClick={(e) => {
              handleSortSubregions(e, 'leader')
            }}
          >
            Leader
          </WButton>
        </WCol>
        <WCol size='2'>
          <WButton
            className='table-header-section'
            wType='texted'
            // style={{ paddingLeft: '2.5%' }}
          >
            Flag
          </WButton>
        </WCol>
        <WCol size='3'>
          <WButton
            className='table-header-section'
            wType='texted'
            // style={{ paddingLeft: '2.5%' }}
          >
            Landmarks
          </WButton>
        </WCol>
      </WRow>
    </div>
  )
}

export default TableHeader
