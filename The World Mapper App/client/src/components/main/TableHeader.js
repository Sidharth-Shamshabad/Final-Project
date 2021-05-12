import React from 'react'

import { WButton, WRow, WCol } from 'wt-frontend'
import { ADD_SUBREGION } from '../../cache/mutations'
import { useMutation, useQuery } from '@apollo/client'
import { GET_DB_REGIONS } from '../../cache/queries'

const TableHeader = (props) => {
  const clickDisabled = () => {}
  const buttonStyle = props.disabled
    ? ' table-header-button-disabled '
    : 'table-header-button '

  const undoOptions = {
    className: !props.canUndo
      ? ' table-header-button-disabled '
      : 'table-header-button',
    onClick: !props.canUndo ? clickDisabled : props.undo,
    wType: 'texted',
    clickAnimation: !props.canUndo ? '' : 'ripple-light',
    shape: 'rounded',
  }

  const redoOptions = {
    className: !props.canRedo
      ? ' table-header-button-disabled '
      : 'table-header-button ',
    onClick: !props.canRedo ? clickDisabled : props.redo,
    wType: 'texted',
    clickAnimation: !props.canRedo ? '' : 'ripple-light',
    shape: 'rounded',
  }
  const [AddSubregion] = useMutation(ADD_SUBREGION)

  const handleAddSubregion = async (e) => {
    const length = props.activeRegion.length
    const id =
      length >= 1
        ? props.regions[length - 1].id + Math.floor(Math.random() * 100 + 1)
        : 1

    let region = {
      _id: '',
      id: id,
      name: 'Untitled',
      owner: props.user._id,
      parentRegion: props.parentRegionId,
      subregions: [],
      capital: 'Untitled',
      leader: 'Untitled',
      flag: 'Untitled',
      landmarks: [],
      sortRule: 'name',
      sortDirection: 1,
    }

    const { loading, error, data } = await AddSubregion({
      variables: { region },
      refetchQueries: [{ query: GET_DB_REGIONS }],
    })
    if (loading) {
    }
    if (error) {
      return `Error: ${error.message}`
    }
    if (data) {
      console.log(data)
      props.fetchUser()
      props.refetchRegions()
    }
  }

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
              handleAddSubregion()
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
      >
        <WCol size='3'>
          <WButton
            className='table-header-section'
            wType='texted'
            // style={{ paddingLeft: '2.5%' }}
          >
            Name
          </WButton>
        </WCol>

        <WCol size='2'>
          <WButton
            className='table-header-section'
            wType='texted'
            // style={{ paddingLeft: '2.5%' }}
          >
            Capital
          </WButton>
        </WCol>

        <WCol size='2'>
          <WButton
            className='table-header-section'
            wType='texted'
            // style={{ paddingLeft: '2.5%' }}
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
