function createVisitor(visitorData) {
    return {
      status: "Visitor created successfully",
      visitor: visitorData
    };
  }
  
  function getVisitorInfo(visitorId) {
    return {
      id: visitorId,
      name: "Bosu Bade",
      checkedIn: true
    };
  }

  async function checkAndCreateVisitor(visitorData, db) {
    const { name, company } = visitorData;
  
    // Normalize the inputs
    const normalizedName = name.trim().toLowerCase();
    const normalizedCompany = company.trim().toLowerCase();
  
    // Find using RegExp to ignore case and spacing
    const existing = await db.findOneAsync({
      name: { $regex: `^${normalizedName}$`, $options: 'i' },
      company: { $regex: `^${normalizedCompany}$`, $options: 'i' }
    });
  
    if (existing) {
      return {
        status: "Visitor already checked in",
        visitor: existing,
        alreadyExists: true
      };
    }
  
    // Insert cleaned data
    const cleanVisitor = {
      name: normalizedName,
      company: normalizedCompany,
      createdAt: new Date()
    };
  
    const id = await db.insertAsync(cleanVisitor);
  
    return {
      status: "Visitor created successfully",
      visitor: cleanVisitor,
      id,
      alreadyExists: false
    };
  }
  module.exports = {
    createVisitor,
    getVisitorInfo,
    checkAndCreateVisitor
  };
