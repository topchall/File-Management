import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDocumentDto, MultilangValue } from 'shared/common/models';

export class PostDocumentDto implements CreateDocumentDto {
  @ApiProperty({ type: Object })
  name!: MultilangValue;

  @ApiProperty()
  fileId!: string;

  @ApiProperty()
  typeId!: string;
}

export class PutDocumentDto implements Partial<CreateDocumentDto> {
  @ApiPropertyOptional({ type: Object })
  name?: MultilangValue;

  @ApiPropertyOptional({ type: String })
  fileId?: string;

  @ApiPropertyOptional({ type: String })
  typeId?: string;
}
