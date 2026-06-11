package com.example.noticeboard.controller;

import com.example.noticeboard.dto.NoticeCreateDto;
import com.example.noticeboard.dto.NoticeDto;
import com.example.noticeboard.model.Notice;
import com.example.noticeboard.service.NoticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;
    private final PagedResourcesAssembler<Notice> pagedResourcesAssembler;

    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<NoticeDto>>> getAllNotices(Pageable pageable) {
        Page<Notice> notices = noticeService.getAllNotices(pageable);
        
        PagedModel<EntityModel<NoticeDto>> pagedModel = pagedResourcesAssembler.toModel(notices, notice -> {
            NoticeDto dto = NoticeDto.builder()
                    .id(notice.getId())
                    .title(notice.getTitle())
                    .content(notice.getContent())
                    .authorUsername(notice.getAuthor().getUsername())
                    .createdAt(notice.getCreatedAt())
                    .build();
            
            return EntityModel.of(dto,
                    linkTo(methodOn(NoticeController.class).getAllNotices(pageable)).withSelfRel());
        });

        return ResponseEntity.ok(pagedModel);
    }

    @PostMapping
    public ResponseEntity<NoticeDto> createNotice(@Valid @RequestBody NoticeCreateDto dto) {
        Notice notice = noticeService.createNotice(dto);
        NoticeDto responseDto = NoticeDto.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .content(notice.getContent())
                .authorUsername(notice.getAuthor().getUsername())
                .createdAt(notice.getCreatedAt())
                .build();
        
        responseDto.add(linkTo(methodOn(NoticeController.class).getAllNotices(Pageable.unpaged())).withRel("all-notices"));
        
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.noContent().build();
    }
}
