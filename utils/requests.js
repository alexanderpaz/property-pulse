const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//Fetch all properties

async function fetchProperties() {
  try {

    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      log.console('Domain is not available yet returning empty list')
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetch single property

async function fetchProperty(id) {
  try {

    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      log.console('Domain is not available yet returning empty list')
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };