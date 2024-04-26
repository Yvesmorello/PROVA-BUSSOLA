import creatorModel from "../schema/creator.schema"
import { creatorType } from "../types/creator.type"

class creatorService {

    async create (criador: creatorType){
        const cratorCreated = await creatorModel.create(criador)
        return cratorCreated;
    }

    async findAll(){
        const creatorFound = await creatorModel.find()
        return creatorFound;
    }

    async findById(id: string){
        const creatorFound = await creatorModel.findById(id)
        return creatorFound;
    }

    async findByApiId(id: string){
        const creatorFound = await creatorModel.findOne({ id }); // Busca pelo campo apiId
        return creatorFound;
    }
   
    async update(creatorId: string, creator: creatorType) {
        try {    
            // Busca o personagem pelo ID fornecido
            const creatorUpdated = await creatorModel.findOneAndUpdate(
                { id: creatorId }, // Usamos o campo _id para filtrar
                {
                    firstName: creator.firstName,
                    middleName: creator.middleName,
                    lastName: creator.lastName,
                    suffix: creator.suffix,
                    fullName: creator.fullName,
                    modified: creator.modified,
                    thumbnail: creator.thumbnail,
                    resourceURI: creator.resourceURI,
                    comics: creator.comics,
                    // series: creator.series,
                    // stories: creator.stories,
                    // events: creator.events,
                    // urls: creator.urls,
                    // function: creator.function
                },
                { new: true }
            );
    
            // Verifica se o personagem foi encontrado e atualizado
            if (!creatorUpdated) {
                throw new Error("Criador não encontrado");
            }
    
            return creatorUpdated;
        } catch (error: any) {
            throw new Error(`Erro ao atualizar criador: ${error.message}`);
        }
    }

    async delete(id: string) {
        try {
            await creatorModel.findByIdAndDelete(id)
            return "Criador Removido"
        } catch (error) {
            throw new Error(`Erro ao remover criador: ${error}`)
        }
    }

}

export default new  creatorService;

