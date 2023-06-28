import useCurrentUser from '@/pages/hooks/usecurrentuser'
import useEditModal from '@/pages/hooks/useeditmodal'
import useUser from '@/pages/hooks/useuser'
import axios from 'axios'
import React, { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '../modal'
import Input from '../input'
import ImageUpload from '../imageupload'

const EditModal: React.FC = () => {
  const { data: currentUser } = useCurrentUser()
  const { mutate: mutatedFetchedUser } = useUser(currentUser?.id)
  const editModal = useEditModal()

  const [profileImage, setProfileImage] = React.useState<string>('')
  const [coverImage, setCoverImage] = React.useState<string>('')
  const [name, setName] = React.useState<string>('')
  const [username, setUsername] = React.useState<string>('')
  const [bio, setBio] = React.useState<string>('')

  React.useEffect(() => {
    setProfileImage(currentUser?.profileImage)
    setCoverImage(currentUser?.coverImage)
    setName(currentUser?.name)
    setUsername(currentUser?.username)
    setBio(currentUser?.bio)
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio
  ])

  const [isLoading, setIsLoading] = React.useState(false)
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage
      })
      mutatedFetchedUser()
      toast.success('User Profile Updated')
      editModal.onClose()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [bio, name, username, profileImage, coverImage, editModal, mutatedFetchedUser])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={image => setProfileImage(image)}
        label='Upload Profile Image'
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={image => setCoverImage(image)}
        label='Upload Cover Image'
      />
      <Input
        placeholder='Name'
        onChange={e => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder='Username'
        onChange={e => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder='Bio'
        onChange={e => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title='Edit your profile'
      actionLabel='Save'
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}

export default EditModal
