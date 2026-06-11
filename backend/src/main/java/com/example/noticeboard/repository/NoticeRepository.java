package com.example.noticeboard.repository;

import com.example.noticeboard.model.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Page<Notice> findByAuthorUsername(String username, Pageable pageable);
}
