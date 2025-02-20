const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    async Hello(req,res){
        res.send('Hello World!');
    },
    /*
    async fetchEmpresas(req, res) {
        try {
            const company = await company_model.find({ company_name: { $regex: ".*" + req.body.query + ".", $options: "i" } })
            return res.send({ obj: company, success: true, msg: "Empresas carregadas" })
        } catch (e) {
            console.log(e)
            return res.send({ obj: null, msg: "Erro ocorrido", error_Msg: e.message, success: false })
        }
    }
    */
    async hotspot_redirect(req, res) {
        const { username, 'link-login-only': linkLoginOnly, hostname, 'link-login': linkLogin, 'link-orig': linkOrig, mac, ip, error } = req.body;
        //HOSTNAME nosso verificador de onde acessou

        console.log('Dados recebidos:', {
            username,
            mac,
            ip,
            hostname,
            linkLoginOnly,
            linkLogin,
            linkOrig
        });

        // Redirecionar para a página hotspot-redirect no frontend
        res.redirect(`https://bonify.netlify.app/hotspot-redirect?mac=${mac}&ip=${ip}&username=${username}&link-login=${linkLogin}&link-login-only=${linkLoginOnly}&link-orig=${linkOrig}&error=${error}`);
    },

    async getAds(req,res){
        console.log(req.body)
        const ads = [ //Exemplo do retorno de propaganda
            {
                title: 'Propaganda Exemplo',
                description: 'Essa é uma propaganda de exemplo, olha que maravilha',
                imageUrl: "https://i.ibb.co/JRsmwJDM/Imagem-do-Whats-App-de-2025-02-20-s-15-20-47-7ecc4516.jpg"
            },
        ]
        return res.status(200).json(ads)
    },

    async hotspotAutorize(req, res) {
        console.log(req.body)
        const { username, password, ip, mac } = req.body;
        console.log('ip =>')
        console.log(req.ip)
        try {
            const response = await axios.post('http://192.168.88.1/login', {
                username: 'usuario',
                password: '',
                ip: ip,
                mac: mac,
                popup: "no",
                submit: "OK"
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            console.log(response.data)
            const $ = cheerio.load(response.data);
            const h1Text = $('h1').text().trim(); // Obtém o texto dentro da tag <h1>

            // Verifica se o texto é "You are logged in"
            if (h1Text === 'You are logged in') {

                res.status(response.status).send(response.data);
            } else {
                res.status(400).json({ ok: false });;
            }

        } catch (error) {
            console.error('Erro ao conectar ao MikroTik:', error);
            res.status(500).send('Erro ao autorizar acesso.');
        }
    }
}