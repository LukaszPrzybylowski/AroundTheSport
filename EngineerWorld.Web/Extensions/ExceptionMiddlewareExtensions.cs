
using EngineerWorld.Model.Exception;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;

namespace EngineerWorld.Web.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        //In production version you would log exceptions into your database ()

                        string body = string.Empty;
                        using (var reader = new StreamReader(context.Response.Body))
                        {
                            //Request.Body.Seek(0, SeekOrigin.Begin);
                            //body = reader.ReadToEnd();
                            body = await reader.ReadToEndAsync();
                        }

                        await context.Response.WriteAsync(new ApiException()
                        {
                            StatusCode = context.Response.StatusCode,
                            Message = body
                        }.ToString());
                    }
                });
            });
        }
    }
}
