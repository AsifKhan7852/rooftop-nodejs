import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { closeAuthModal, switchAuthMode } from '../../store/slices/uiSlice'
import CloseIcon from '@mui/icons-material/Close'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const AuthModal = () => {
    const dispatch = useDispatch()
    const { authModal } = useSelector((state: RootState) => state.ui)

    useEffect(() => {
        if (authModal.isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [authModal.isOpen])

    if (!authModal.isOpen) return null

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => dispatch(closeAuthModal())}
            />

            <div className="relative w-full max-w-lg bg-surface-dark border border-primary-700/50 rounded-2xl shadow-2xl p-6 animate-scale-up max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button
                    onClick={() => dispatch(closeAuthModal())}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <CloseIcon />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-display font-bold text-gray-100">
                        {authModal.mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        {authModal.mode === 'login'
                            ? 'Sign in to continue to RoofTop Cricket'
                            : 'Join the community of cricket enthusiasts'}
                    </p>
                </div>

                {authModal.mode === 'login' ? <LoginForm /> : <SignupForm />}

                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        {authModal.mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => dispatch(switchAuthMode())}
                            className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                        >
                            {authModal.mode === 'login' ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuthModal
