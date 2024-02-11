const awaitPostRequestHandler = async (url: string, requestString: string | null, method: string = "POST") => {
  if (requestString === null) {
    const response = await fetch(url, {
      method: method,
      mode: 'cors',
      credentials: 'same-origin',
      cache: 'no-cache',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    if (!response.ok) {
      throw new Error('HTTP error: status ${response.status}');
    }
    return response
  } else {
    const response = await fetch(url, { method: method, mode: 'cors', cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: requestString
    })
    if (!response.ok) {
      throw new Error('HTTP error: status ${response.status}');
    }
    return response
  }
}


export default awaitPostRequestHandler
