﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EngineerWorld.Model.Article
{
    public class ArticleCreate
    {
        public int ArticleId { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MinLength(10, ErrorMessage = "Must be at least 10-200 characters")]
        [MaxLength(50, ErrorMessage = "Must be at least 10-50 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Content is required")]
        [MinLength(300, ErrorMessage = "Must be at least 300-100000 characters")]
        [MaxLength(100000, ErrorMessage = "Must be at least 300-100000 characters")]
        public string Content { get; set; }
        public int? PhotoId { get; set; }
    }
}
