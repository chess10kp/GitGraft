const awaitPostRequestHandler = async (url: string, requestString: string ) => { 
    const response = await fetch(url, { 
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: requestString
    })
  return response 
}


export default awaitPostRequestHandler
