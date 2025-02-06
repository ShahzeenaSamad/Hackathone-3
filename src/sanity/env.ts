export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-07"

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skUCNXysZtognYMenny6dkuErfR7ecB3D7WcsT0eZ8UUuFCY1XeTmYnaKhqiltgSgAhTa4UTd4PCMiHzZXj8MXou4E7GV5GLbzYQIEwKKf64Ivz52g4ZONhJnWx0T1sDVL5qUecXO97eOiWUGaGqg4Zsrfv0V6eFXuFtY49UdFUPz0SLkoXC",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
