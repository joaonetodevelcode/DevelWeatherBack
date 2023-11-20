import user from "../models/User.js";

class UserController {
    
    static async listUsers(req, res) {
        try {
            const userList = await user.find({})
            res.status(200).json(userList)
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - 
            falha na requisicao` })
        }
    }

    static async userLogin(req, res) {
        const email =  req.body.email;
        const password = req.body.password;
        try {
            const userFound = await user.findOne({email: email, password: password});

            if(userFound){
                res.status(200).json({message: 'Usuario encontrado', user: userFound})
            } else {
                res.status(200).json({message: 'Usuario não encontrado'})
            }            
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - 
            falha na requisicao` })
        }
    }

    static async userRegister(req, res) {
        const newUser = req.body
        try {
            const userRegister = await user.create(newUser);
            res.status(200).json({message: "Usuario cadastrado com sucesso", user: userRegister})         
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - 
            falha na requisicao` })
        }
    }

    static async userUpdate(req, res) {
        try {
            const id = req.params.id;
            await user.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Usuario atualizado com sucesso"});
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - 
            falha na requisicao` });
        }
    }  
    static async userDelete(req, res) {
        try {
            const id = req.params.id
            await user.findByIdAndDelete(id)
            res.status(200).json({message: "Usuario deletado com sucesso"})
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - 
            falha na requisicao` })
        }
    }   


}

export default UserController;