package com.example.noticeboard.controller;

import com.example.noticeboard.dto.NoticeCreateDto;
import com.example.noticeboard.dto.NoticeDto;
import com.example.noticeboard.mapper.NoticeMapper;
import com.example.noticeboard.model.Notice;
import com.example.noticeboard.service.NoticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;
    private final NoticeMapper noticeMapper;

    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<NoticeDto>>> getAllNotices(Pageable pageable) {
        Page<Notice> noticesPage = noticeService.getAllNotices(pageable);
        
        List<EntityModel<NoticeDto>> noticeModels = noticesPage.getContent().stream()
                .map(notice -> {
                    NoticeDto dto = noticeMapper.toDto(notice);
                    return EntityModel.of(dto,
                            linkTo(methodOn(NoticeController.class).getAllNotices(pageable)).withSelfRel());
                })
                .collect(Collectors.toList());

        PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(
                noticesPage.getSize(), 
                noticesPage.getNumber(), 
                noticesPage.getTotalElements(), 
                noticesPage.getTotalPages());

        PagedModel<EntityModel<NoticeDto>> pagedModel = PagedModel.of(noticeModels, metadata);

        // Dodanie linków paginacji ręcznie, aby spełnić wymóg HATEOAS bez PagedResourcesAssembler
        pagedModel.add(linkTo(methodOn(NoticeController.class).getAllNotices(pageable)).withSelfRel());
        if (noticesPage.hasNext()) {
            pagedModel.add(linkTo(methodOn(NoticeController.class).getAllNotices(pageable.next())).withRel("next"));
        }
        if (noticesPage.hasPrevious()) {
            pagedModel.add(linkTo(methodOn(NoticeController.class).getAllNotices(pageable.previousOrFirst())).withRel("prev"));
        }

        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/my")
    public ResponseEntity<PagedModel<EntityModel<NoticeDto>>> getMyNotices(Pageable pageable) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Page<Notice> noticesPage = noticeService.getUserNotices(username, pageable);
        
        List<EntityModel<NoticeDto>> noticeModels = noticesPage.getContent().stream()
                .map(notice -> {
                    NoticeDto dto = noticeMapper.toDto(notice);
                    return EntityModel.of(dto,
                            linkTo(methodOn(NoticeController.class).getMyNotices(pageable)).withSelfRel());
                })
                .collect(Collectors.toList());

        PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(
                noticesPage.getSize(), 
                noticesPage.getNumber(), 
                noticesPage.getTotalElements(), 
                noticesPage.getTotalPages());

        PagedModel<EntityModel<NoticeDto>> pagedModel = PagedModel.of(noticeModels, metadata);
        pagedModel.add(linkTo(methodOn(NoticeController.class).getMyNotices(pageable)).withSelfRel());
        
        return ResponseEntity.ok(pagedModel);
    }

    @PostMapping
    public ResponseEntity<NoticeDto> createNotice(@Valid @RequestBody NoticeCreateDto dto) {
        Notice notice = noticeService.createNotice(dto);
        NoticeDto responseDto = noticeMapper.toDto(notice);
        
        responseDto.add(linkTo(methodOn(NoticeController.class).getAllNotices(Pageable.unpaged())).withRel("all-notices"));
        
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.noContent().build();
    }
}
