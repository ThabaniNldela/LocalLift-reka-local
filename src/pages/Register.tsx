import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { validateEmail, validatePhone } from '@/utils/helpers'

export const Register: React.FC = () => {
  const { register, isLoading, error: authError } = useAuth()
  const [userType, setUserType] = useState<'customer' | 'vendor'>('customer')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const type = params.get('type')
    if (type === 'vendor' || type === 'customer') {
      setUserType(type)
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format'

    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (userType === 'vendor' && formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        userType,
        formData.phone
      )
      window.location.href = '/'
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-lg bg-emerald-700 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="#fbbf24"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Join Reka Local</h1>
            <p className="text-gray-600 mt-2">Create your account</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{authError}</p>
            </div>
          )}

          <div className="mb-6 flex gap-2">
            {(['customer', 'vendor'] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setUserType(type)
                  setErrors({})
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  userType === type
                    ? 'bg-emerald-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type === 'customer' ? 'Customer' : 'Vendor'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              placeholder="John Doe"
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              placeholder="you@example.com"
            />

            {userType === 'vendor' && (
              <Input
                label="Phone Number (Optional)"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
                placeholder="+1 (555) 000-0000"
              />
            )}

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              placeholder="••••••••"
              helperText="At least 8 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              placeholder="••••••••"
            />

            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-emerald-700 rounded" />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-emerald-700 hover:text-emerald-800">
                  Terms of Service
                </a>
              </span>
            </label>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Create Account
            </Button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-emerald-700 hover:text-emerald-800 font-semibold">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
