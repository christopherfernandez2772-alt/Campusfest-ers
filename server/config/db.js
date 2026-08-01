const dns = require('dns');
const mongoose = require('mongoose');

// Some machines/networks (VPNs, ISP or router DNS) don't support the SRV/TXT
// lookups required by "mongodb+srv://" URIs, causing errors like
// "querySrv ECONNREFUSED". Falling back to public DNS resolvers fixes this
// without needing to change the connection string.
function usePublicDnsServersAsFallback() {
  const fallbackServers = ['8.8.8.8', '1.1.1.1'];
  const currentServers = dns.getServers();
  dns.setServers([...currentServers, ...fallbackServers]);
}

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri);
  } catch (err) {
    const isDnsSrvIssue = err.code === 'ECONNREFUSED' && /querySrv/.test(err.message || '');
    if (isDnsSrvIssue) {
      console.warn('MongoDB SRV DNS lookup failed, retrying with public DNS servers (8.8.8.8, 1.1.1.1)...');
      usePublicDnsServersAsFallback();
      await mongoose.connect(uri);
    } else {
      throw err;
    }
  }

  console.log(`MongoDB Atlas connected: ${mongoose.connection.host}`);
}

module.exports = connectDB;