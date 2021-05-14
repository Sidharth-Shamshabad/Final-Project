import React, { useState } from 'react'
import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_MAP_FILE } from '../../cache/mutations'
import { GET_DB_REGIONS } from '../../cache/queries'
import WMFooter from 'wt-frontend/build/components/wmodal/WMFooter'

const DeleteSubregion = (props) => {
  //   const [DeleteMapFile] = useMutation(DELETE_MAP_FILE)
  //   const _id = props.activeid
  const handleDelete = async () => {
    // props.deleteList(props.activeid);
    // DeleteMapFile({
    //   variables: { _id: _id },
    //   refetchQueries: [{ query: GET_DB_REGIONS }],
    // })
    props.deleteSubregion(
      props.activeRegion._id,
      props.activeRegion,
      props.subregionId,
      'subregions',
      props.index
    )
    props.setShowDelete(false)
  }

  return (
    <WModal className='delete-modal' cover='true' visible={props.setShowDelete}>
      <WMHeader
        className='modal-header'
        onClose={() => props.setShowDelete(false)}
        style={{ backgroundColor: 'red', fontWeight: 'bold' }}
      >
        Delete Subregion?
      </WMHeader>
      <WMMain style={{ backgroundColor: 'black' }}>
        <WButton
          className='modal-button'
          onClick={handleDelete}
          clickAnimation='ripple-light'
          hoverAnimation='darken'
          shape='rounded'
          color='danger'
        >
          Delete
        </WButton>
        <WButton
          className='modal-button cancel-button'
          onClick={() => props.setShowDelete(false)}
          wType='texted'
        >
          Cancel
        </WButton>
        <label className='col-spacer'>&nbsp;</label>
      </WMMain>
    </WModal>
  )
}

export default DeleteSubregion
