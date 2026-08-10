// Sanitization middleware: trims string fields and escapes angle brackets to reduce XSS risk.
// Minimal, dependency-free implementation that preserves non-string values.

function escapeHtml(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === 'string') {
      obj[key] = escapeHtml(val.trim());
    } else if (Array.isArray(val)) {
      obj[key] = val.map((v) => (typeof v === 'string' ? escapeHtml(v.trim()) : sanitizeObject(v)));
    } else if (val && typeof val === 'object') {
      sanitizeObject(val);
    }
  }
  return obj;
}

module.exports = function sanitize(req, res, next) {
  try {
    if (req.body && typeof req.body === 'object') sanitizeObject(req.body);
    if (req.query && typeof req.query === 'object') sanitizeObject(req.query);
    if (req.params && typeof req.params === 'object') sanitizeObject(req.params);
  } catch (err) {
    // Never throw from sanitizer; let downstream validation handle malformed input
  }
  return next();
};
