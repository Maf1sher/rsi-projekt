package com.example.noticeboard.service;

import com.example.noticeboard.dto.NoticeCreateDto;
import com.example.noticeboard.model.Notice;
import com.example.noticeboard.model.User;
import com.example.noticeboard.repository.NoticeRepository;
import com.example.noticeboard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;

    public Page<Notice> getAllNotices(Pageable pageable) {
        return noticeRepository.findAll(pageable);
    }

    public Page<Notice> getUserNotices(String username, Pageable pageable) {
        return noticeRepository.findByAuthorUsername(username, pageable);
    }

    @Transactional
    public Notice createNotice(NoticeCreateDto dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notice notice = Notice.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .author(author)
                .build();

        return noticeRepository.save(notice);
    }

    @Transactional
    public void deleteNotice(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notice not found"));

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!notice.getAuthor().getUsername().equals(currentUsername)) {
            throw new RuntimeException("You can only delete your own notices");
        }

        noticeRepository.delete(notice);
    }
}
