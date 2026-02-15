import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openAuthModal } from '../../store/slices/uiSlice'

interface AuthRedirectProps {
    mode: 'login' | 'signup'
}

const AuthRedirect = ({ mode }: AuthRedirectProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        // Open the auth modal with the specified mode
        dispatch(openAuthModal(mode))

        // Navigate back to home page
        navigate('/', { replace: true })
    }, [dispatch, navigate, mode])

    return null
}

export default AuthRedirect
