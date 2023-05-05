using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EngineerWorld.Model.Avatar
{
    public class Avatar : AvatarCreate
    {
        public int AvatarId { get; set; }

        public int ApplicationUserId { get; set; }

    }
}
