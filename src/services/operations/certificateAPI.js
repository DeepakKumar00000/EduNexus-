import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { certificateEndpoints } from "../apis"

const {
  GENERATE_CERTIFICATE_API,
  GET_USER_CERTIFICATES_API,
  GET_CERTIFICATE_BY_ID_API,
} = certificateEndpoints

// Generate certificate for a completed course
export const generateCertificate = async (courseId, token) => {
  const toastId = toast.loading("Generating certificate...")
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GENERATE_CERTIFICATE_API,
      { courseId },
      { Authorization: `Bearer ${token}` }
    )

    console.log("GENERATE_CERTIFICATE_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Certificate generated successfully")
    result = response.data.certificate
  } catch (error) {
    console.log("GENERATE_CERTIFICATE_API API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not generate certificate")
  }
  toast.dismiss(toastId)
  return result
}

// Get all certificates for a user
export const getUserCertificates = async (token) => {
  const toastId = toast.loading("Fetching certificates...")
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_CERTIFICATES_API,
      null,
      { Authorization: `Bearer ${token}` }
    )

    console.log("GET_USER_CERTIFICATES_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    result = response.data.data
  } catch (error) {
    console.log("GET_USER_CERTIFICATES_API API ERROR............", error)
    toast.error("Could not fetch certificates")
  }
  toast.dismiss(toastId)
  return result
}

// Get a specific certificate by ID
export const getCertificateById = async (certificateId) => {
  const toastId = toast.loading("Fetching certificate...")
  let result = null
  try {
    const response = await apiConnector(
      "GET",
      `${GET_CERTIFICATE_BY_ID_API}/${certificateId}`,
      null
    )

    console.log("GET_CERTIFICATE_BY_ID_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    result = response.data.data
  } catch (error) {
    console.log("GET_CERTIFICATE_BY_ID_API API ERROR............", error)
    toast.error("Could not fetch certificate")
  }
  toast.dismiss(toastId)
  return result
}
