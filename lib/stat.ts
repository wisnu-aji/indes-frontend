export const stat = async () => {
  try {
    const responseSudahBayar = await fetch("/api/user/stat", {
      method: "POST",
      body: JSON.stringify({
        status: "sudah-bayar",
      }),
    })

    const responseTelatBayar = await fetch("/api/user/stat", {
      method: "POST",
      body: JSON.stringify({
        status: "telat-bayar",
      }),
    })
    const telatBayar = (await responseTelatBayar.json()) as {
      ok: boolean
      count: number
    }
    const sudahBayar = (await responseSudahBayar.json()) as {
      ok: boolean
      count: number
    }
    console.log(telatBayar, sudahBayar)
    if (!telatBayar.ok || !sudahBayar.ok)
      throw new Error("Internal Server Error")
    return { telatBayar, sudahBayar }
  } catch (error) {
    console.log(error)
    return null
  }
}
