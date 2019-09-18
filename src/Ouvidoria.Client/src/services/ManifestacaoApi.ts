import http from "../application/http";
import CadastroManifestacao from "../models/Manifestacao/CadastroManifestacao";
import Resultado from "../models/Resultado";

export default class ManifestacaoApi {
    public static async Create(manifestation: CadastroManifestacao): Promise<Resultado> {
        return await http.post(`/api/Manifestacao/`, manifestation);
    }
}