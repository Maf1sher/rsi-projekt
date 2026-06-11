package com.example.noticeboard.mapper;

import com.example.noticeboard.dto.NoticeDto;
import com.example.noticeboard.model.Notice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NoticeMapper {

    @Mapping(source = "author.username", target = "authorUsername")
    NoticeDto toDto(Notice notice);
}
