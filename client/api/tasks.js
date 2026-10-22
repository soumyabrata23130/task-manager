export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json([{ id: 1, title: 'Sample Task' }]);
  }
}
