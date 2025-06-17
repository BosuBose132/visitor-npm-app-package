// transformToFhir.js
function transformToFhir(visitorData) {
  const nameParts = visitorData.name?.split(' ') || [];
  const givenName = nameParts.slice(0, -1).join(' ') || visitorData.name;
  const familyName = nameParts.slice(-1).join('') || '';

  return {
    resourceType: "Patient",
    name: [
      {
        use: "official",
        family: familyName,
        given: [givenName]
      }
    ],
    telecom: visitorData.email ? [{ system: "email", value: visitorData.email }] : [],
    managingOrganization: {
      display: visitorData.company
    },
    meta: {
      tag: [
        {
          system: "http://example.org/tags",
          code: "visitor",
          display: "Visitor Badge Entry"
        }
      ]
    }
  };
}

module.exports = transformToFhir;
