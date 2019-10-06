import TipoManifestacao from "../application/enums/TipoManifestacao";
import http from "../application/http";
import CadastroInteracao from "../models/Interacao/CadastroInteracao";
import Interacao from "../models/Interacao/Interacao";
import CadastroManifestacao from "../models/Manifestacao/CadastroManifestacao";
import Manifestacao from "../models/Manifestacao/Manifestacao";
import ManifestacaoPreview from "../models/Manifestacao/ManifestacaoPreview";
import Resultado from "../models/Resultado";

export default class ManifestacaoApi {
  public static async Reply(
    interaction: CadastroInteracao
  ): Promise<Resultado<Interacao>> {
    return await http.post(`/api/Manifestacao/Reply`, interaction);
  }

  public static async GetDetails(id: number): Promise<Resultado<Manifestacao>> {
    return await http.get(`/api/Manifestacao/GetDetails/${id}`);
  }

  public static async Get(): Promise<Resultado<ManifestacaoPreview[]>> {
    return await http.get(`/api/Manifestacao/`);
  }

  public static async GetByType(
    type: TipoManifestacao
  ): Promise<Resultado<ManifestacaoPreview[]>> {
    return await http.get(`/api/Manifestacao/${type}`);
  }

  public static async GetPersonalManifestations(): Promise<
    Resultado<ManifestacaoPreview[]>
  > {
    return await http.get(`/api/Manifestacao/GetPersonalManifestations`);
  }

  public static async GetPersonalManifestationsByType(
    type: TipoManifestacao
  ): Promise<Resultado<ManifestacaoPreview[]>> {
    return await http.get(
      `/api/Manifestacao/GetPersonalManifestations/${type}`
    );
  }

  public static async Create(
    manifestation: CadastroManifestacao
  ): Promise<Resultado> {
    return await http.post(`/api/Manifestacao/`, manifestation);
  }
}
