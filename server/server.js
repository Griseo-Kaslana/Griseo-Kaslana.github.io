const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/posts', postRoutes);

// 静态文件服务
app.use(express.static('client/public'));

// 数据库连接
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));
