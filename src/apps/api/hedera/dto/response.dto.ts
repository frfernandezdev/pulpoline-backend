import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { ResponsePaginatorDTO } from "@/src/contexts/shared/infrastructure/response/paginator.dto";
import { ResponseDTO } from "@/src/contexts/shared/infrastructure/response/response.dto";

export class HederaResponse {
  @ApiResponseProperty()
  @Expose()
  readonly tokenId: string;

  @ApiResponseProperty()
  @Expose()
  readonly name: string;

  @ApiResponseProperty()
  @Expose()
  readonly symbol: string;

  @ApiResponseProperty()
  @Expose()
  readonly initialSupply: string;
}

export class HederaResponseDTO extends ResponseDTO {
  @ApiResponseProperty({
    type: HederaResponse,
  })
  @Type(() => HederaResponse)
  @Expose()
  readonly result?: HederaResponse[];
}

export class HederaResponsePaginatorDTO extends ResponsePaginatorDTO {
  @ApiResponseProperty({
    type: [HederaResponse],
  })
  @Type(() => HederaResponse)
  @Expose()
  readonly results?: HederaResponse[];
}
