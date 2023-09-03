// api.js

const API_KEY = "OWeh_-zUi6aD29TxkRgYGIvldJby8LtS";

export async function createHouse(formData) {
  const houseFormData = new FormData();
  for (const key in formData) {
    if (key !== "image") {
      houseFormData.append(key, formData[key]);
    }
  }

  const houseHeaders = new Headers();
  houseHeaders.append("X-Api-Key", API_KEY);

  const houseRequestOptions = {
    method: "POST",
    headers: houseHeaders,
    body: houseFormData,
    redirect: "follow",
  };

  try {
    const houseResponse = await fetch(
      "https://api.intern.d-tt.nl/api/houses",
      houseRequestOptions
    );
    if (houseResponse.ok) {
      const houseResult = await houseResponse.json();
      return houseResult;
    } else {
      throw new Error("House creation request failed");
    }
  } catch (error) {
    throw error;
  }
}

export async function editHouse(routeParams, formData) {
  const houseFormData = new FormData();
  for (const key in formData) {
    houseFormData.append(key, formData[key]);
  }

  const houseHeaders = new Headers();
  houseHeaders.append("X-Api-Key", API_KEY);

  const houseRequestOptions = {
    method: "POST",
    headers: houseHeaders,
    body: houseFormData,
    redirect: "follow",
  };

  try {
    const houseResponse = await fetch(
      `https://api.intern.d-tt.nl/api/houses/${routeParams.id}`,
      houseRequestOptions
    );

    if (houseResponse.ok) {
      return true;
    } else {
      throw new Error("House update request failed");
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteHouse(houseId) {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", API_KEY);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://api.intern.d-tt.nl/api/houses/${houseId}`,
      requestOptions
    );
    if (response.ok) {
      return true;
    } else {
      throw new Error("House deletion request failed");
    }
  } catch (error) {
    throw error;
  }
}
